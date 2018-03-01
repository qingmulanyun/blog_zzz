class CartItemPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def destroy_item?
    record.cart.id == user.cart.id
  end
end
