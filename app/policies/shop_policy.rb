class ShopPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def show?
    record.user_id == user.id
  end

  def my_shop?
    show?
  end
end
