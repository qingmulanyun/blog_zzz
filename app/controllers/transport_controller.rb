class TransportController < ApplicationController
 def index
   auth = 'apikey ' + ENV['apikey']
   url = 'https://api.transport.nsw.gov.au/v1/roads/static/offstreetparking'
   @resource = RestClient::Resource.new( url )
   @response = @resource.get( :Authorization => auth )
   render json: @response
 end
end
