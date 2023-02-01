class PostSerializer < ActiveModel::Serializer
  attributes :id, :image, :caption, :likes, :created_at

  # belongs_to :user
end
