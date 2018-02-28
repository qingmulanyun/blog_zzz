class CartPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def add_item?
    true
  end

  def remove_item?
    true
  end
end
