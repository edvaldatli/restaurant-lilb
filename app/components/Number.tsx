"use client";

type NumberTypes = {
  active: boolean;
  number: number;
};

export default function Number({ active, number }: NumberTypes) {
  if (active) {
    return (
      <div className="flex justify-center items-center rounded-full h-8 w-8 bg-request-orange border">
        {number}
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center rounded-full h-8 w-8 bg-request-red border">
        {number}
      </div>
    );
  }
}
