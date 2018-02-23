class Order < ActiveRecord::Base

  has_many :order_items, dependent: :destroy
  belongs_to :shop
  belongs_to :buyer, class_name: 'User'
end
