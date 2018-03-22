class Address < ActiveRecord::Base

  belongs_to :user

  def dis_primary
    self.is_primary = false
    self.save!
  end

  def full_address
    "#{province} #{city} #{area} #{address_line_1}"
  end

  def receiver
    "#{receiver_name} #{receiver_phone}"
  end
end
