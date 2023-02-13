class PostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :image, :caption, :users_likes, :created_at

  # belongs_to :user
end
