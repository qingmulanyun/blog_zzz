class SettingPolicy < ApplicationPolicy
  def profile?
    true
  end

  def profile_info?
    true
  end

  def update_profile_info?
    true
  end

  def create_address?
    true
  end

  def addresses_index?
    true
  end
end
