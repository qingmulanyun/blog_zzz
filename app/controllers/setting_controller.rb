class SettingController < ApplicationController

  def profile
    authorize :setting, :profile?
  #   todo default setting page
  end

  def addresses_index
    authorize :setting, :addresses_index?
  end
end
