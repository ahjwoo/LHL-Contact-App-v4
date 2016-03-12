require 'sinatra'
require 'sinatra/cross_origin'

configure do
  enable :cross_origin
end


# Homepage (Root path)
get '/' do
  erb :index
end

##Just an example json 
get '/example.json' do
  content_type :json
  { :key1 => 'value1', :key2 => 'value2'}.to_json
end

##Save route, results is defaulted at false.  Create a new
##user with name and email.  If save, results = true 
##and send to json.
post '/api/contact/save' do
  content_type :json
  results = {success: false}
  @contact = User.new(name: params[:name], email: params[:email])

  if @contact.save
    results[:success] = true
    # binding.pry
    results.to_json
  end
end

##Search route. Not necessary in this case.
# get '/api/contact/search' do
#   content_type :json
#   results = {success: false}
#   @contact = User.find(params[:name])

get '/contact/index' do
  @contacts = User.all
  json @contacts

end

post '/contact/destroy' do
  content_type :json
  results = {success: false}
  @contact = User.find(params[:id])
  
  if @contact.destroy
    results[:success] = true
    results.to_json
  end
end
