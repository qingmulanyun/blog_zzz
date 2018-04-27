class CartPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def remove_item?
    true
  end

  def show_items?
    true
  end

  def index?
    true
  end

  def destroy_item?
    true
  end
end
