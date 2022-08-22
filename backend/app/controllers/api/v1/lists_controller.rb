# frozen_string_literal: true

module Api
  module V1
    class ListsController < ApplicationController
      before_action :set_list, only: %i[destroy]

      def index
        user = User.find(params[:user_id])
        lists = user.lists

        render json: {
          lists: lists
        }, status: :ok
      end

      def create
        list = List.new(list_params)
        if list.save
          render json: { status: 'SUCCESS', data: list }
        else
          render json: { status: 'ERROR', data: list.errors }
        end
      end

      def destroy
        @list.destroy
        render json: { status: 'SUCCESS', message: 'Deleted the list', data: @list }
      end

      private

      def set_list
        # user = User.find(params[:user_id])
        # List = user.lists
        @list = List.find(params[:id])
      end

      def list_params
        params.permit(:name).merge(user_id: params[:user_id])
      end
    end
  end
end
