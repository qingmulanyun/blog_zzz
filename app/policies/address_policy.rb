class AddressPolicy < ApplicationPolicy
  def delete_address?
    record.user_id == user.id
  end
end
