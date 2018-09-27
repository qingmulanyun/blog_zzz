class Item < ActiveRecord::Base
  mount_uploader :image, ItemImageUploader

  belongs_to :shop
  belongs_to :item_brand
  belongs_to :item_type
  belongs_to :wish_product
  has_many :order_items

  enum membership: [ :normal, :vip]

  monetize :price_cents, with_model_currency: :price_currency
  monetize :original_price_cents, with_model_currency: :original_price_currency
  monetize :transport_cost_cents, with_model_currency: :transport_cost_currency
  monetize :sale_price_cents, with_model_currency: :sale_price_currency

  validates_presence_of :original_price_cents, :transport_cost_cents, :price_cents, :sale_price_cents, :weight

  scope :starred, -> { where starred: true }

  FOREX = "CNY".freeze

  def formatted_price
    price.exchange_to(FOREX).to_f
  end

  def display_original_price
    price.exchange_to(FOREX).to_f * (1 + formatted_commission)
  end

  def formatted_commission
    commission/100
  end

  def formatted_transport_cost
    transport_cost.exchange_to(FOREX).to_f
  end

  def formatted_sale_price
    sale_price.exchange_to(FOREX).to_f
  end

  def formatted_original_price
    original_price.exchange_to(FOREX).to_f
  end

  def sales_number
    order_items&.sum(:quantity)
  end
end
