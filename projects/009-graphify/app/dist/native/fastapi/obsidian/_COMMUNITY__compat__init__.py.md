---
type: community
cohesion: 0.07
members: 58
---

# _compat/__init__.py

**Cohesion:** 0.07 - loosely connected
**Members:** 58 nodes

## Members
- [[TODO pv2 should this return strings instead]] - rationale - encoders.py
- [[TODO remove this function once the required version of Pydantic fully]] - rationale - _compat/shared.py
- [[dot-__get_pydantic_core_schema__()]] - code - datastructures.py
- [[dot-__get_pydantic_json_schema__()]] - code - datastructures.py
- [[dot-__init__()_1]] - code - datastructures.py
- [[dot-_validate()]] - code - datastructures.py
- [[dot-close()]] - code - datastructures.py
- [[dot-read()]] - code - datastructures.py
- [[dot-seek()]] - code - datastructures.py
- [[dot-write()]] - code - datastructures.py
- [[A file uploaded in a request. Define it as a path operation function (or…]] - rationale - datastructures.py
- [[Any]] - code
- [[Any_4]] - code
- [[Any_7]] - code
- [[Close the file. To be awaitable, compatible with async, this is run in…]] - rationale - datastructures.py
- [[Color]] - code - encoders.py
- [[Decimal]] - code
- [[Doc_2]] - code
- [[Encodes a Decimal as int if there's no exponent, otherwise float This is useful…]] - rationale - encoders.py
- [[FieldInfo_2]] - code
- [[GetJsonSchemaHandler]] - code
- [[Move to a position in the file. Any next read or write will be done from that…]] - rationale - datastructures.py
- [[PyExtraColor]] - code - encoders.py
- [[Read some bytes from the file. To be awaitable, compatible with async, this is…]] - rationale - datastructures.py
- [[TypeGuard]] - code
- [[UploadFile]] - code - datastructures.py
- [[Write some bytes to the file. You normally wouldn't use this from a file you…]] - rationale - datastructures.py
- [[_T]] - code
- [[_annotation_is_complex()]] - code - _compat/shared.py
- [[_annotation_is_sequence()]] - code - _compat/shared.py
- [[_compat__init__.py]] - code - _compat/__init__.py
- [[_extract_form_body()]] - code - dependencies/utils.py
- [[analyze_param()]] - code - dependencies/utils.py
- [[annotation_is_pydantic_v1()]] - code - _compat/shared.py
- [[copy_field_info()]] - code - _compat/v2.py
- [[create_model_field()]] - code - utils.py
- [[date]] - code
- [[decimal_encoder()]] - code - encoders.py
- [[encoders.py]] - code - encoders.py
- [[field_annotation_is_complex()]] - code - _compat/shared.py
- [[field_annotation_is_scalar()]] - code - _compat/shared.py
- [[field_annotation_is_scalar_sequence()]] - code - _compat/shared.py
- [[field_annotation_is_sequence()]] - code - _compat/shared.py
- [[generate_encoders_by_class_tuples()]] - code - encoders.py
- [[is_bytes_or_nonable_bytes_annotation()]] - code - _compat/shared.py
- [[is_bytes_sequence_annotation()]] - code - _compat/shared.py
- [[is_pydantic_v1_model_class()]] - code - _compat/shared.py
- [[is_pydantic_v1_model_instance()]] - code - _compat/shared.py
- [[is_scalar_field()]] - code - _compat/v2.py
- [[is_uploadfile_or_nonable_uploadfile_annotation()]] - code - _compat/shared.py
- [[is_uploadfile_sequence_annotation()]] - code - _compat/shared.py
- [[isoformat()]] - code - encoders.py
- [[lenient_issubclass()]] - code - _compat/shared.py
- [[serialize_sequence_value()]] - code - _compat/v2.py
- [[shared.py]] - code - _compat/shared.py
- [[time]] - code
- [[types.py]] - code - types.py
- [[value_is_sequence()]] - code - _compat/shared.py

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_compat/__init__py
SORT file.name ASC
```

## Connections to other communities
- 16 edges to [[_COMMUNITY_dependenciesutils.py]]
- 10 edges to [[_COMMUNITY_ModelField]]
- 8 edges to [[_COMMUNITY_v2.py]]
- 6 edges to [[_COMMUNITY_get_openapi_path]]
- 4 edges to [[_COMMUNITY_Any_1]]
- 4 edges to [[_COMMUNITY_Any]]
- 3 edges to [[_COMMUNITY___init__.py]]
- 3 edges to [[_COMMUNITY_utils.py]]
- 2 edges to [[_COMMUNITY_get_definitions]]
- 1 edge to [[_COMMUNITY_HTTPException]]
- 1 edge to [[_COMMUNITY_security__init__.py]]
- 1 edge to [[_COMMUNITY_Example]]
- 1 edge to [[_COMMUNITY_routing.py]]
- 1 edge to [[_COMMUNITY_exceptions.py]]

## Top bridge nodes
- [[_compat__init__.py]] - degree 28, connects to 5 communities
- [[analyze_param()]] - degree 15, connects to 4 communities
- [[create_model_field()]] - degree 9, connects to 3 communities
- [[_extract_form_body()]] - degree 12, connects to 2 communities
- [[serialize_sequence_value()]] - degree 5, connects to 2 communities