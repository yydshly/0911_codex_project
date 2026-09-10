"""Local-only read-only query gateway to the installed upstream CLI."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse
import argparse
import json
import os
import subprocess
import sys
import tempfile
import threading

DIST=Path(__file__).resolve().parent/'dist'
GRAPH=DIST/'native/fastapi/graph.json'
LIMIT=threading.BoundedSemaphore(2)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(DIST),**kwargs)
    def send_json(self,status,data):
        encoded=json.dumps(data,ensure_ascii=False).encode('utf-8')
        self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(encoded)));self.end_headers();self.wfile.write(encoded)
    def do_GET(self):
        if urlparse(self.path).path=='/api/status':
            self.send_json(200,{'live':True,'engine':'graphifyy 0.9.57 CLI','graph':'FastAPI','readOnly':True});return
        return super().do_GET()
    def do_POST(self):
        if self.path!='/api/query':self.send_json(404,{'error':'Unknown endpoint'});return
        if self.headers.get('Origin') not in (None,f'http://127.0.0.1:{self.server.server_port}',f'http://localhost:{self.server.server_port}'):
            self.send_json(403,{'error':'Only this local page may query'});return
        try:
            length=int(self.headers.get('Content-Length','0'))
            if length<1 or length>8192:raise ValueError('请求过大或为空')
            data=json.loads(self.rfile.read(length))
            if not isinstance(data,dict):raise ValueError('请求必须为对象')
            command=data.get('command');args=data.get('arguments')
            if command not in ('query','explain','path','affected'):raise ValueError('不支持的查询类型')
            expected=2 if command=='path' else 1
            if not isinstance(args,list) or len(args)!=expected:raise ValueError('参数数量不正确')
            if any(not isinstance(arg,str) or not arg.strip() or len(arg)>500 or arg.startswith('-') or any(ord(c)<32 for c in arg) for arg in args):raise ValueError('请输入有效的符号或问题，最多 500 字符')
        except (ValueError,TypeError) as error:self.send_json(400,{'error':str(error)});return
        if not LIMIT.acquire(blocking=False):self.send_json(429,{'error':'正在处理其他查询，请稍后重试'});return
        try:
            with tempfile.TemporaryDirectory(prefix='graphify-readonly-') as tmp:
                extra=['--budget','100000'] if command=='query' else []
                result=subprocess.run([sys.executable,'-m','graphify',command,*args,*extra,'--graph',str(GRAPH)],cwd=tmp,capture_output=True,text=True,encoding='utf-8',errors='replace',env={**os.environ,'PYTHONIOENCODING':'utf-8','GRAPHIFY_OUT':tmp},timeout=45)
            clean=lambda text:text.replace(str(GRAPH),'FastAPI / graph.json').replace(GRAPH.as_posix(),'FastAPI / graph.json')
            self.send_json(200,{'command':command,'arguments':args,'exitCode':result.returncode,'output':clean(result.stdout),'stderr':clean(result.stderr),'live':True})
        except subprocess.TimeoutExpired:self.send_json(504,{'error':'查询超过 45 秒，请缩小问题范围'})
        finally:LIMIT.release()


if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--port',type=int,default=8769);args=parser.parse_args()
    assert GRAPH.exists(), 'Generate native graph before starting the query server'
    server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    print(f'Graphify native demo: http://127.0.0.1:{args.port}/',flush=True)
    server.serve_forever()
