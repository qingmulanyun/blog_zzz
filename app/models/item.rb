class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader
end
