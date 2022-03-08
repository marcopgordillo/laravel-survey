<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->id,
            'title'         => $this->title,
            'image_url'     => $this->image ? Storage::url($this->image) : null,
            'slug'          => $this->slug,
            'status'        => $this->status !== 'draft',
            'description'   => $this->description,
            'created_at'    => (new \DateTime($this->created_at))->format('Y-m-d H:i:s'),
            'expire_date'   => (new \DateTime($this->expire_date))->format('Y-m-d'),
            'questions'     => QuestionResource::collection($this->whenLoaded('questions')),
            $this->merge(
                Arr::except(parent::toArray($request), [
                    'user_id', 'updated_at', 'created_at', 'expire_date', 'image', 'status'
                ])
            ),
        ];
    }
}
