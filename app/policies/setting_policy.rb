class SettingPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end

    def profile?
      true
    end

    def addresses_index?
      true
    end
  end
end
