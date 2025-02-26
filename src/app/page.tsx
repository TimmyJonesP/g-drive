"use client"

import React, { useState } from "react"
import { ChevronRight, File, Folder, Upload } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

// Mock data structure
const mockData = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    items: ["folder1", "folder2", "file1", "file2"],
  },
  folder1: {
    id: "folder1",
    name: "Documents",
    type: "folder",
    parentId: "root",
    items: ["folder3", "file3", "file4"],
  },
  folder2: {
    id: "folder2",
    name: "Photos",
    type: "folder",
    parentId: "root",
    items: ["file5", "file6"],
  },
  folder3: {
    id: "folder3",
    name: "Work",
    type: "folder",
    parentId: "folder1",
    items: ["file7", "file8"],
  },
  file1: {
    id: "file1",
    name: "Resume.pdf",
    type: "pdf",
    parentId: "root",
    url: "#",
  },
  file2: {
    id: "file2",
    name: "Budget.xlsx",
    type: "excel",
    parentId: "root",
    url: "#",
  },
  file3: {
    id: "file3",
    name: "Project Proposal.docx",
    type: "word",
    parentId: "folder1",
    url: "#",
  },
  file4: {
    id: "file4",
    name: "Meeting Notes.txt",
    type: "text",
    parentId: "folder1",
    url: "#",
  },
  file5: {
    id: "file5",
    name: "Vacation.jpg",
    type: "image",
    parentId: "folder2",
    url: "#",
  },
  file6: {
    id: "file6",
    name: "Family.png",
    type: "image",
    parentId: "folder2",
    url: "#",
  },
  file7: {
    id: "file7",
    name: "Presentation.pptx",
    type: "powerpoint",
    parentId: "folder3",
    url: "#",
  },
  file8: {
    id: "file8",
    name: "Contract.pdf",
    type: "pdf",
    parentId: "folder3",
    url: "#",
  },
}

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState("root")
  const [breadcrumbs, setBreadcrumbs] = useState([{ id: "root", name: "My Drive" }])

  // Function to navigate to a folder
  const navigateToFolder = (folderId: string, folderName: string) => {
    const newBreadcrumbs = [...breadcrumbs]

    // Check if we're navigating to a folder that's already in the breadcrumb path
    const existingIndex = newBreadcrumbs.findIndex((crumb) => crumb.id === folderId)

    if (existingIndex !== -1) {
      // If it exists, truncate the breadcrumbs to that point
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1))
    } else {
      // Otherwise, add the new folder to the breadcrumbs
      setBreadcrumbs([...newBreadcrumbs, { id: folderId, name: folderName }])
    }

    setCurrentFolder(folderId)
  }

  // Function to handle the mock upload
  const handleUpload = () => {
    alert("Upload functionality would open a file picker in a real application.")
  }

  // Get the current folder's items
  const currentFolderData = mockData[currentFolder as keyof typeof mockData] as any
  const currentItems = currentFolderData?.items || []

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.id}>
                  <BreadcrumbItem>
                    {index < breadcrumbs.length - 1 ? (
                      <BreadcrumbLink onClick={() => navigateToFolder(crumb.id, crumb.name)} className="cursor-pointer">
                        {crumb.name}
                      </BreadcrumbLink>
                    ) : (
                      <span>{crumb.name}</span>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>

          <Button onClick={handleUpload} className="flex items-center gap-2">
            <Upload size={16} />
            Upload
          </Button>
        </div>

        <div className="bg-card rounded-lg border shadow-sm">
          <div className="p-2 border-b">
            <div className="grid grid-cols-12 text-sm font-medium text-muted-foreground">
              <div className="col-span-6 px-4 py-2">Name</div>
              <div className="col-span-3 px-4 py-2">Type</div>
              <div className="col-span-3 px-4 py-2">Actions</div>
            </div>
          </div>

          <div className="divide-y">
            {currentItems.map((itemId: string) => {
              const item = mockData[itemId as keyof typeof mockData] as any

              return (
                <div key={item.id} className="grid grid-cols-12 items-center hover:bg-muted/50">
                  <div className="col-span-6 px-4 py-3 flex items-center gap-3">
                    {item.type === "folder" ? (
                      <Folder className="h-5 w-5 text-blue-400" />
                    ) : (
                      <File className="h-5 w-5 text-gray-400" />
                    )}
                    {item.type === "folder" ? (
                      <button
                        onClick={() => navigateToFolder(item.id, item.name)}
                        className="font-medium hover:underline text-left"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link href={item.url} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                    )}
                  </div>
                  <div className="col-span-3 px-4 py-3 text-muted-foreground capitalize">{item.type}</div>
                  <div className="col-span-3 px-4 py-3">
                    {item.type === "folder" ? (
                      <Button variant="ghost" size="sm" onClick={() => navigateToFolder(item.id, item.name)}>
                        Open <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Link href={item.url}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}

            {currentItems.length === 0 && (
              <div className="px-4 py-8 text-center text-muted-foreground">This folder is empty</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

