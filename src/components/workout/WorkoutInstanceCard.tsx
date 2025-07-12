"use client";

import { EquipmentResponseDto, SetResponseDto } from "@/types/workout.types";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useState } from "react";
import WorkoutInstanceDialog from "./WorkoutInstanceDialog";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

interface WorkoutInstanceCardProps {
  id: string;
  name?: string;
  description?: string;
  equipment?: EquipmentResponseDto;
  sets?: Array<SetResponseDto>;
  completed: boolean;
  onUpdated: (id: string, completed: boolean) => void;
}

export default function WorkoutInstanceCard({
  id,
  name,
  description,
  equipment,
  sets,
  completed,
  onUpdated,
}: Readonly<WorkoutInstanceCardProps>) {
  const [open, setOpen] = useState<boolean>(false);

  const formatSets = (sets?: SetResponseDto[]): string => {
    if (!sets || sets.length === 0) return "Sem séries cadastradas";

    const repsMap: { [reps: number]: number } = {};

    sets.forEach(({ reps }) => {
      repsMap[reps] = (repsMap[reps] || 0) + 1;
    });

    const formatted = Object.entries(repsMap)
      .map(([reps, count]) => `${count} x ${reps}`)
      .join(" / ");

    return formatted;
  };

  return (
    <>
      <Card elevation={5}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardContent>
            <CardHeader
              title={
                <Typography
                  variant="h6"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  {name}{" "}
                  {completed && (
                    <CheckCircleOutlinedIcon color="success" fontSize="small" />
                  )}
                </Typography>
              }
              subheader={
                <Typography color="text.secondary">
                  {formatSets(sets)}
                </Typography>
              }
            />
          </CardContent>
        </CardActionArea>
      </Card>

      <WorkoutInstanceDialog
        id={id}
        name={name}
        description={description}
        equipment={equipment}
        sets={sets}
        open={open}
        completed={completed}
        onClose={() => setOpen(false)}
        onUpdated={onUpdated}
      />
    </>
  );
}
