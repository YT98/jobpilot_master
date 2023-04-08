from app import db


# TODO: Write tests for this
# This is a temporary solution to convert the snake_case properties to camelCase
def return_model_properties_camelcase(model: db.Model):
    properties = {}
    for key, value in model.__dict__.items():
        if key.startswith('_'):
            continue

        temp = key.split('_')
        camel_case_key = temp[0] + ''.join([word.capitalize() for word in temp[1:]])

        properties[camel_case_key] = value
    return properties
