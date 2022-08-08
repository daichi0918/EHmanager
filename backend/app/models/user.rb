class User < ApplicationRecord
  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  has_many :lists

  validates :name, :email, :encrypted_password, :gender, presence: true
  validates :name, length: { maximum: 30 }
  validates :email, presence: true, length: { maximum: 100 },uniqueness: true
  #, format: { with: VALID_EMAIL_REGEX }
  validates :encrypted_password, presence: true, length: { minimum: 6 }

  # validates :image, content_type: { in: %w[image/jpeg image/gif image/png],
  #                                   message: 'must be a valid image format' },
  #                   size: { less_than: 1.megabytes,
  #                           message: 'should be less than 1MB' }

  enum gender: { man: 0, woman: 1 }

end
