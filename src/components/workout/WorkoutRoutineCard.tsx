"use client";

import { getWorkoutRoutineInstanceBySchemaId } from "@/api/services/workoutService";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface WorkoutRoutineCardProps {
  id?: string;
  name?: string;
  description?: string;
  tags?: Array<string>;
}

export default function WorkoutRoutineCard({
  id,
  name,
  description,
  tags,
}: Readonly<WorkoutRoutineCardProps>) {
  const router = useRouter();

  async function handleClick() {
    if (!id) return;

    try {
      const workoutRoutineInstance = await getWorkoutRoutineInstanceBySchemaId(
        id
      );
      router.push(`/dashboard/trainee/workouts/${workoutRoutineInstance.id}`);
    } catch (ex) {
      console.error(ex);
    }
  }

  return (
    <Card elevation={5}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <CardHeader
            title={name}
            subheader={
              <Typography color="text.secondary">{description}</Typography>
            }
          />
          <CardActions>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, index) => (
                <Chip
                  key={`tag:${tag}`}
                  label={tag}
                  color="warning"
                  size="small"
                  sx={{ color: "text.primary" }}
                ></Chip>
              ))}
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
