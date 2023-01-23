class User < ApplicationRecord
    validates :username, presence: true, uniqueness: true
    # validates password and password confirmation using bcrypt

    has_many :posts
    has_secure_password #{ Password Protection, using 'bcrypt' gem }
end
