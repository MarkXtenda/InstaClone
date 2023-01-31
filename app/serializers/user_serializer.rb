class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar, :bio

  has_many :posts
  has_many :followers
  has_many :followings
end
