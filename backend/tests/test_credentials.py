import json
import pytest
from app.models import User, Credential

# Test the GET /api/credentials endpoint
def test_get_credentials(test_client):
    # First, sign up and log in a user
    test_client.post('/api/auth/signup', 
                                       data=json.dumps({
                                           'username': 'testuser3',
                                           'email': 'testuser3@example.com',
                                           'password': 'testpassword3'
                                       }), 
                                       content_type='application/json')
    login_response = test_client.post('/api/auth/login', 
                                      data=json.dumps({
                                          'username': 'testuser3',
                                          'password': 'testpassword3'
                                      }), 
                                      content_type='application/json')
    login_data = json.loads(login_response.data)
    access_token = login_data['access_token']
    
   

    # Retrieve the credentials
    response = test_client.get('/api/credentials',
                               headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    credentials = json.loads(response.data)
    assert len(credentials) == 1