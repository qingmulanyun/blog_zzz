module NavHelper
  def membership_display
    span_context = ''
    case current_user.membership
      when 'vip'
        span_context = '(VIP)'
    end
    content_tag(:span, span_context, class: "cart-badges")
  end

  def cart_items_count
    content_tag(:span, current_user.cart_items_count, class: "cart-badges")
  end

  def orders_count
    span_context = current_user.shop.new_orders.count > 0 ? current_user.shop.new_orders.count  : ''
    content_tag(:span, span_context, class: "cart-badges-orders")
  end

  def wish_products_count
    span_context = WishProduct.status_at('approved').count > 0 ? WishProduct.status_at('approved').count : ''
    content_tag(:span, span_context, class: "cart-badges-orders")
  end
end
