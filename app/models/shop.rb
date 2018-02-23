class Shop < ActiveRecord::Base

  belongs_to :user
  has_many :items

  has_many :admin_orders, class_name: 'Order', dependent: :destroy
end
