class SettingPolicy < ApplicationPolicy
  def profile?
    true
  end

  def addresses_index?
    true
  end
end
