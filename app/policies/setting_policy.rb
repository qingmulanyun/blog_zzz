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
end
