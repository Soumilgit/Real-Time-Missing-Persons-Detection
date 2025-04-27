import json
import base64
import boto3

rekognition = boto3.client('rekognition')

COLLECTION_ID = 'missingpersons'
THRESHOLD = 85

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        image_base64 = body['image']
        image_bytes = base64.b64decode(image_base64)
        
        response = rekognition.search_faces_by_image(
            CollectionId=COLLECTION_ID,
            Image={'Bytes': image_bytes},
            FaceMatchThreshold=THRESHOLD,
            MaxFaces=1
        )
        
        results = []
        if response.get('FaceMatches', []):
            face = response['FaceMatches'][0]
            person_name = face['Face']['ExternalImageId'].replace('_', ' ')
            results.append({'person_name': person_name})
        
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'matches': results})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
            'body': json.dumps({'error': str(e)})
        }
