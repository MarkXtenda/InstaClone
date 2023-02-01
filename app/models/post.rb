class Post < ApplicationRecord
    default_scope { order(id: :desc)}   #{ Makes posts appear in descending rder i.e the newest created ones will show up first }

    belongs_to :user
end
