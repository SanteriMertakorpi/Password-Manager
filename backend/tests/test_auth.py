import json
import pytest
from app.models import User

def test_signup(test_client):
    response = test_client.post('/api/auth/signup', 
                                data=json.dumps({
                                    'username': 'testuser',
                                    'email': 'testuser@example.com',
                                    'password': 'testpassword'
                                }), 
                                content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['message'] == 'User created successfully'

    # Check if the user was actually added to the database
    user = User.query.filter_by(username='testuser').first()
    assert user is not None
    assert user.email == 'testuser@example.com'

def test_login(test_client):
    # First, sign up a user
    test_client.post('/api/auth/signup', 
                     data=json.dumps({
                         'username': 'testuser2',
                         'email': 'testuser2@example.com',
                         'password': 'testpassword2'
                     }), 
                     content_type='application/json')

    # Now, try logging in with the correct credentials
    response = test_client.post('/api/auth/login', 
                                data=json.dumps({
                                    'username': 'testuser2',
                                    'password': 'testpassword2'
                                }), 
                                content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'access_token' in data

    # Try logging in with incorrect credentials
    response = test_client.post('/api/auth/login', 
                                data=json.dumps({
                                    'username': 'testuser2',
                                    'password': 'wrongpassword'
                                }), 
                                content_type='application/json')
    assert response.status_code == 401
    data = json.loads(response.data)
    assert data['message'] == 'Invalid credentials'