class User < ApplicationRecord
    has_many :posts
    has_secure_password #{ Password Protection, using 'bcrypt' gem }
end
