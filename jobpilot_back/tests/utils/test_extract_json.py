import pytest

from utils.extract_json import extract_json_object, extract_json_objects


def test_extract_json_objects():
    text = '{"a": 1} {"b": 2} {"c": 3}'
    result = list(extract_json_objects(text))
    assert result == [{'a': 1}, {'b': 2}, {'c': 3}]


def test_extract_json_object():
    text = '{"a": 1} {"b": 2} {"c": 3}'
    result = extract_json_object(text)
    assert result == {'a': 1}


def test_extract_json_object_empty():
    text = ''
    with pytest.raises(ValueError):
        extract_json_object(text)


def test_extract_json_object_no_json():
    text = 'This is not JSON'
    with pytest.raises(ValueError):
        extract_json_object(text)


def test_extract_json_object_no_json2():
    text = '["This", "is", "not", "a", "JSON", "object"]'
    with pytest.raises(ValueError):
        extract_json_object(text)


def test_extract_json_object_no_json_object2():
    text = '["There", "is", "a", "JSON", "object", {"a": 1}]'
    result = extract_json_object(text)
    assert result == {'a': 1}
