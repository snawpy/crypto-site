from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = { 
            'password': {
                'write_only': True,     # write/post only, won't return with GET request
                'required': True        # required if posting (registering),
            },
            # 'email': {
            #     'write_only': True
            # }     
        }

    def create(self, validated_data):
        # user = User.objects.create_user(**validated_data)
        # Token.objects.create(user=user)
        # return user        
        # OR
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        Token.objects.create(user=user)
        user.set_password(validated_data['password'])
        user.save() 
        return user

    # def update(self, validated_data):
    #     User.objects.update(
        # )


# User with register V3
# todo validate email is valid email!
class RegistrationSerializer(serializers.ModelSerializer):
    # https://www.youtube.com/watch?v=_OhF6FEdIao
    # password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        # can add custom fields not related to model ie password 2
        # fields = ['username', 'email', 'password', 'password2'] 
        fields = ['username', 'email', 'password']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }
    
    def save(self):
        # TTODO: add  validated_data as second parameter and remove .self like we have in other serializer
        user = User.objects.create(
            username=self.validated_data['username'],
            email=self.validated_data['username']
        )
        password = self.validated_data['password']
        # password2 = self.validated_data['password2']

        # if password != password2:
        #     raise serializers.ValidationError({'message': 'Passwords do not match.'})
        
        Token.objects.create(user=user)
        user.set_password(password)
        user.save()
        return user




# Todo: make a serializer for email change method, or do i even need one HMM
class PasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    # todo
    # Use this validation for when creating account so requires proper password above
    # def validate_new_password(self, value):
    #     validate_password(value)
    #     return value


