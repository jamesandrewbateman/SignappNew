Spree::Admin::ProductsController.class_eval do
  def update_editor_bg_image
    product = Spree::Product.find params[:product_id]
    #product is being found, need to figure out where to store the background image id now.
    product.editor_background_image_id = params["image_id"]
    product.save
    render :json => { :result => "ok" }
  end

  def edit
    #@product = Spree::Product.find_by_permalink(params[:id], :conditions => ["is_material=true"]) || nil
    @product = Spree::Product.first(:conditions => ["permalink = ? AND is_material = 't'", params[:id]]) || nil
    if @product.nil?
      redirect_to "/admin/products/product_not_found"
    end
  end

  def create
    authorize! :create, Spree::Product
    params[:product][:available_on] ||= Time.now
    @product = Spree::Product.new(params[:product])
    @product.is_material = 't'
    if @product.save
    else
      invalid_resource!(@product)
    end
  end

  def product_not_found

  end
end