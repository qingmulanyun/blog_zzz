class PostPolicy < ApplicationPolicy

  def index_public?
    true
  end
end