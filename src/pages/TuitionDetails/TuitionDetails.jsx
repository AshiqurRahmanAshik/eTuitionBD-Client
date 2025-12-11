import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const TuitionDetails = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const {
    data: tuition = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuitionDetails", id],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/tuitions/${id}`
      );
      return result.data;
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12 py-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <div className="w-full h-96 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <h1 className="text-6xl font-bold mb-4">{tuition.subject}</h1>
                  <p className="text-3xl font-semibold">{tuition.className}</p>
                  <p className="text-2xl mt-2">{tuition.medium}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:gap-10 flex-1">
          {/* Tuition Info */}
          <Heading
            title={tuition.subject}
            subtitle={`${tuition.className} - ${tuition.medium}`}
          />
          <hr className="my-6" />

          {/* Description */}
          <div className="text-lg font-light text-neutral-500">
            {tuition.description}
          </div>
          <hr className="my-6" />

          {/* Location */}
          <div className="flex items-center gap-3 text-xl font-semibold">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>Location: {tuition.location}</div>
          </div>
          <hr className="my-6" />

          {/* Schedule */}
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="gap-4 font-light text-neutral-500 text-lg">
              Schedule: {tuition.schedule}
            </p>
          </div>
          <hr className="my-6" />

          {/* Contact */}
          <div className="flex items-center gap-3 text-xl font-semibold">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href={`tel:${tuition.phone}`}
              className="text-blue-600 hover:underline"
            >
              {tuition.phone}
            </a>
          </div>
          <hr className="my-6" />

          {/* Budget and Apply Button */}
          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl text-green-600">
              Budget: ৳{tuition.budget}
            </p>
            <div>
              <Button onClick={() => setIsOpen(true)} label="Apply Now" />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal
            closeModal={closeModal}
            isOpen={isOpen}
            tuition={tuition}
          />
        </div>
      </div>
    </Container>
  );
};

export default TuitionDetails;
