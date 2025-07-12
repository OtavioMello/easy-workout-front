"use client";

import { updateWorkoutInstanceById } from "@/api/services/workoutService";
import {
  EquipmentResponseDto,
  SetResponseDto,
  WorkoutInstanceUpdateRequestDto,
} from "@/types/workout.types";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

interface WorkoutInstanceDialogProps {
  id: string;
  name?: string;
  description?: string;
  equipment?: EquipmentResponseDto;
  sets?: Array<SetResponseDto>;
  open: boolean;
  completed: boolean;
  onClose: () => void;
  onUpdated: (id: string, completed: boolean) => void;
}

export default function WorkoutInstanceDialog({
  open,
  onClose,
  id,
  name,
  description,
  equipment,
  sets = [],
  completed,
  onUpdated,
}: Readonly<WorkoutInstanceDialogProps>) {
  const [editableSets, setEditableSets] = useState<SetResponseDto[]>(sets);
  const [isWorkoutInstanceCompleted, setIsWorkoutInstanceCompleted] =
    useState(completed);

  function onChangeTextFieldValue(
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setEditableSets((prev) => {
      const updated = [...prev];

      if (name === "reps") {
        updated[index] = {
          ...updated[index],
          reps: value === "" ? NaN : parseInt(value),
        };
      } else if (name === "weight") {
        updated[index] = {
          ...updated[index],
          weight: value === "" ? NaN : parseFloat(value),
        };
      }

      return updated;
    });
  }

  async function onSave() {
    try {
      const updatedWorkoutInstace: WorkoutInstanceUpdateRequestDto = {
        sets: [...editableSets],
        completed: isWorkoutInstanceCompleted,
      };
      await updateWorkoutInstanceById(id, updatedWorkoutInstace);
      onUpdated(id, isWorkoutInstanceCompleted);
      onClose();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle variant="h5">{name}</DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          color="text.secondary"
          marginBottom={"10px"}
        >
          {description}
        </Typography>
        <Divider />
        <Typography
          variant="body1"
          color="text.secondary"
          marginTop={"10px"}
          marginBottom={"10px"}
        >
          Equipamento: {equipment?.name}
        </Typography>
        <Stack spacing={2} mt={2}>
          {editableSets?.map((set, index) => (
            <Stack key={set.id} direction={"row"} spacing={2}>
              <TextField
                name="reps"
                label="Reps"
                type="number"
                value={isNaN(set.reps) ? "" : set.reps}
                color="warning"
                onChange={(e) => onChangeTextFieldValue(index, e)}
              />
              <TextField
                name="weight"
                label="Peso"
                type="number"
                value={isNaN(set.weight) ? "" : set.weight}
                color="warning"
                onChange={(e) => onChangeTextFieldValue(index, e)}
              />
            </Stack>
          ))}
          <FormControlLabel
            control={
              <Checkbox
                color="warning"
                checked={isWorkoutInstanceCompleted}
                onChange={(e) =>
                  setIsWorkoutInstanceCompleted(e.target.checked)
                }
              />
            }
            label="Marcar como concluído"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning">
          Cancelar
        </Button>
        <Button
          onClick={onSave}
          size="large"
          color="warning"
          variant="contained"
          sx={{ color: "#fff" }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
