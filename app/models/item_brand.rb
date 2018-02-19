class ItemBrand < ActiveRecord::Base
  mount_uploader :avatar, ItemBrandAvatarUploader

  has_many :items
end
