"use client";

type NumberType = {
  number: number;
};

export default function Number({ number }: NumberType) {
  return (
    <div className="flex justify-center items-center rounded-full h-8 w-8 bg-request-orange border">
      {number}
    </div>
  );
}
