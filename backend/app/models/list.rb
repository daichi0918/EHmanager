class List < ApplicationRecord
  belongs_to :user, optional: true
  
  validates :name, presence: true, length: { maximum: 30 }

end
