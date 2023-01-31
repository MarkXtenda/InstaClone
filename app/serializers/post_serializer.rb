class PostSerializer < ActiveModel::Serializer
  attributes :id, :image, :caption, :likes

  # belongs_to :user
end
