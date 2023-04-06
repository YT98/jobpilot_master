from json import JSONDecoder

def extract_json_objects(text, decoder=JSONDecoder()):
    """Find JSON objects in text, and yield the decoded JSON data

    Does not attempt to look for JSON arrays, text, or other JSON types outside
    of a parent JSON object.

    """
    pos = 0
    while True:
        match = text.find('{', pos)
        if match == -1:
            break
        try:
            result, index = decoder.raw_decode(text[match:])
            yield result
            pos = match + index
        except ValueError:
            pos = match + 1

def extract_json_object(text, decoder=JSONDecoder()):
    """Find the first JSON object in text, and return the decoded JSON data

    Does not attempt to look for JSON arrays, text, or other JSON types outside
    of a parent JSON object.

    """
    for result in extract_json_objects(text, decoder):
        return result
    raise ValueError('No JSON object could be decoded')