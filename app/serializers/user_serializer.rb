class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar, :bio

  has_many :posts
end
