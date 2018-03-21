class Address < ActiveRecord::Base

  belongs_to :user

  def dis_primary
    self.is_primary = false
    self.save!
  end
end
