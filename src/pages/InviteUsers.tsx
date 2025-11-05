import { X, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const InviteUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const contacts = [
    "08045803006",
    "08045803006",
    "aaaamir elec",
    "Aadars Mahrotra Consept",
    "aadil Consile",
    "Aahanaa मिश्रा",
    "Aahish fufa",
    "Aakas Rastogi",
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold">Invite Users</h1>
        <div className="w-10" />
      </div>

      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="w-full rounded-none border-b border-border bg-transparent h-auto p-0">
          <TabsTrigger
            value="contacts"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent"
          >
            Contacts
          </TabsTrigger>
          <TabsTrigger
            value="manual"
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent text-muted-foreground"
          >
            Manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-0">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for a person"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-0"
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="divide-y divide-border">
            {filteredContacts.map((contact, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center flex-shrink-0">
                  <Plus className="h-5 w-5 text-muted-foreground" />
                </div>
                <span className="text-left font-medium">{contact}</span>
              </button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manual" className="p-4">
          <p className="text-muted-foreground text-center py-8">
            Enter email addresses or phone numbers manually
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InviteUsers;
