import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { EditorFormProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { customSectionSchema, CustomSectionValues } from "@/lib/validation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CustomSectionForm({ resumeData, setResumeData }: EditorFormProps) {
  const form = useForm<CustomSectionValues>({
    resolver: zodResolver(customSectionSchema),
    defaultValues: {
      customSections: resumeData.customSections || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({
        ...resumeData,
        customSections:
          values.customSections?.map((section) => ({
            ...section,
            items: section?.items?.filter((item) => item !== undefined) || [],
          })) || [],
      });
    });
    return () => unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "customSections",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
    }
  }

  return (
    <div className="relative z-50 mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Custom Sections</h2>
        <p className="text-muted-foreground text-sm">
          Add any additional sections to your resume.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3 rounded-lg border border-white/20 bg-black px-3 py-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <CustomSectionItem
                  id={field.id}
                  index={index}
                  form={form}
                  key={field.id}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  items: [],
                })
              }
            >
              Add Section
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface CustomSectionItemProps {
  id: string;
  index: number;
  form: UseFormReturn<CustomSectionValues>;
  remove: (index: number) => void;
}

function CustomSectionItem({
  id,
  index,
  form,
  remove,
}: CustomSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control: form.control,
    name: `customSections.${index}.items`,
  });

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border bg-white/5 p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl",
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold">Custom Section {index + 1}</span>
        <GripHorizontal
          className="text-muted-foreground size-5 cursor-grab focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`customSections.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Section Title</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoFocus
                placeholder="e.g. Hobbies, Certifications..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-4 space-y-3 border-t pt-3">
        {itemFields.length > 0 && (
          <div className="space-y-2">
            {itemFields.map((itemField, itemIndex) => (
              <CustomItemField
                key={itemField.id}
                sectionIndex={index}
                itemIndex={itemIndex}
                form={form}
                onRemove={() => removeItem(itemIndex)}
              />
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendItem({
                title: "",
                subTitle: "",
                description: "",
                dateRange: "",
              })
            }
          >
            Add Item
          </Button>
        </div>
      </div>

      <Button type="button" variant="destructive" onClick={() => remove(index)}>
        Remove Section
      </Button>
    </div>
  );
}

interface CustomItemFieldProps {
  sectionIndex: number;
  itemIndex: number;
  form: UseFormReturn<CustomSectionValues>;
  onRemove: () => void;
}

function CustomItemField({
  sectionIndex,
  itemIndex,
  form,
  onRemove,
}: CustomItemFieldProps) {
  return (
    <div className="space-y-2 rounded-md border bg-white/5 p-3 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Item {itemIndex + 1}</span>
        <Button type="button" variant="destructive" onClick={onRemove}>
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={
            `customSections.${sectionIndex}.items.${itemIndex}.title` as const
          }
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Item title"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={
            `customSections.${sectionIndex}.items.${itemIndex}.subTitle` as const
          }
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Subtitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="Item subtitle"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={
          `customSections.${sectionIndex}.items.${itemIndex}.description` as const
        }
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                value={field.value || ""}
                placeholder="Item description"
                className="min-h-[60px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={
          `customSections.${sectionIndex}.items.${itemIndex}.dateRange` as const
        }
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs">Date Range</FormLabel>
            <FormControl>
              <Input
                {...field}
                value={field.value || ""}
                placeholder="e.g., Jan 2020 - Dec 2021"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default CustomSectionForm;
