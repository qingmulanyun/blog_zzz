class Advertisement < ApplicationRecord
  mount_uploader :image, AdImageUploader
end
