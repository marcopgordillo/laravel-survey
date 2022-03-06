<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
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
            'image_url'     => Storage::url($this->image),
            'slug'          => $this->slug,
            'status'        => $this->status !== 'draft',
            'description'   => $this->description,
            'created_at'    => $this->created_at,
            'updated_ad'    => $this->updated_at,
            'expire_date'   => $this->expire_date,
            'questions'     => [],
        ];
    }
}
